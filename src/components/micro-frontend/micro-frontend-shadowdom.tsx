import React, { useEffect, useCallback, ReactElement, useState } from 'react';
import { MicroFrontend } from '../../mf-contract';
import { useHistory } from 'react-router-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';
import { render, unmountComponentAtNode } from 'react-dom'

export interface MicroFrontendProps extends MicroFrontend {
  fallback: ReactElement;
  name: string;
}

function MicroFrontendComponent({ name, url, fallback, path }: MicroFrontendProps) {
  const [isLoading, setIsLoading] = useState(true);
  const mfRenderMethodName: any = `render${name}`;
  const history = useHistory();
  const mfCSS: any = `${name}-stylesheets`;
  const mountMicroFrontend = useCallback((shadow: ShadowRoot | undefined) => {
    return new Promise((resolve, reject) => {
      if(!window[mfRenderMethodName]) {
        (window[mfCSS] as any) = [];

        fetch(`${url}/asset-manifest.json`)
        .then(res => res.json())
        .then(manifest => {
          const resourcePromises: Promise<void>[] = [];

          manifest.entrypoints.forEach((entry: string, index: number) => {
            const resourceId = `${name}-${index}`;

            if(!document.getElementById(resourceId)) {
              if(entry.endsWith('.js')) {
                const scriptTag = document.createElement('script');
              
                scriptTag.id = `${name}-${index}`;
                scriptTag.src = `${url}/${entry}`;
                resourcePromises.push(
                  new Promise(resolve => {
                    scriptTag.onload = resolve as any;
                  })
                )
                
                shadow?.appendChild(scriptTag);
              } else if(entry.endsWith('.css')) {
                const cssTag = document.createElement('link');
              
                cssTag.id = `${name}-${index}`;
                cssTag.href = `${url}/${entry}`;
                cssTag.type = 'text/css';
                cssTag.rel = 'stylesheet';

                (window[mfCSS] as any).push(cssTag);
  
                shadow?.appendChild(cssTag);
              }
            }
          });

          Promise.all(resourcePromises)
                 .then(() => resolve());
        })
        .catch(err => {
          reject(err);
        });
      }
      else {
        (window[mfCSS] as any).forEach((cssTag: HTMLLinkElement) => {
          if(!document.getElementById(cssTag.id)) {
            shadow?.appendChild(cssTag);
          }
        });
        resolve();
      }
    });
  }, [name, mfRenderMethodName, url, mfCSS]);

  useEffect(() => {
    let mfContainer = document.getElementById(`${name}-container`);

    if(!mfContainer) {
      mfContainer = document.createElement('div');
      mfContainer.id = `${name}-container`;
    }

    const root = document.getElementById(name);
    let shadow = root?.shadowRoot;

    if(root && !shadow) {
      shadow = root?.attachShadow({
        mode: 'open'
      });
    }

    if(shadow) {
      mountMicroFrontend(shadow).then(() => {
        const mfRenderMethod: (history: any, basename: string) => ReactElement = window[name as any] as any;
        
        if(shadow && mfContainer) {
          shadow.appendChild(mfContainer);
  
          const mf = mfRenderMethod(history, path);
          render(mf, mfContainer);
          setIsLoading(false);
          retargetEvents(shadow);
        }
      });
    }

    return () => {
      if(mfContainer) unmountComponentAtNode(mfContainer);
    };
  }, [name, mfRenderMethodName, mountMicroFrontend, history, path]);

  return (
    <>
      {isLoading && fallback}
      <main id={name} />
    </>
  );
}

export default MicroFrontendComponent;
