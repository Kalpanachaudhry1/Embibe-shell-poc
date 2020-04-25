import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  #root {
      height: 100%;
  }

  .width-100 {
    width: 100%;
  }
  
  // padding styles
  .no-padding {
    padding: 0px;
  }

  // margin styles
  .no-margin {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .listing-action-icons {
    color: #d4d7de;
    font-size: 1.2rem;
  }
  
  .listing-action-icons:hover {
    color: #1364ce;
    font-size: 1.3rem;
  }

  // listing table
  .listing-table thead > tr > th {
    background: #f0f6fe !important;
  }

  // listing page buttons
  .car-button button {
    background: #fdda9e !important;
    color: #763704 !important;
    border: none;
    outline: none;
  }

  .ncar-button button {
    background: #b4e8bd !important;
    color: #06582d !important;
    border: none;
    outline: none;
  }
  
  .ant-typography-ellipsis-single-line {
    width: 100%;
  }
`;

export default GlobalStyle;
