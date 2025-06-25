import React from 'react';


export const Home = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} fill="none" {...props}>
  <path d="M3 10L12 3L21 10V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V10Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M9 22V14H15V22" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
)

export const Cookbook = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#333333"} fill={"none"} {...props}>
  <path d="M21 16.9286V3H12C8.22876 3 6.34315 3 5.17157 4.17157C4 5.34315 4 7.22876 4 11V19.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M21 17H6.5C5.11929 17 4 18.1193 4 19.5C4 20.8807 5.11929 22 6.5 22H21" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M21 22C19.6193 22 18.5 20.8807 18.5 19.5C18.5 18.1193 19.6193 17 21 17" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M14.3877 6.84933C14.7057 6.63424 15.0883 6.50878 15.5 6.50878C16.6046 6.50878 17.5 7.41206 17.5 8.52633C17.5 9.62271 16.5957 10.54 15.5 10.54V11.5C15.5 12.4428 15.5 12.9142 15.2071 13.2071C14.9142 13.5 14.4428 13.5 13.5 13.5H11.5C10.5572 13.5 10.0858 13.5 9.79289 13.2071C9.5 12.9142 9.5 12.4428 9.5 11.5V10.665C8.33217 10.665 7.5 9.79515 7.5 8.52633C7.5 7.41206 8.39543 6.50878 9.5 6.50878C9.91166 6.50878 10.2943 6.63424 10.6123 6.84933C10.8857 6.06347 11.6276 5.5 12.5 5.5C13.3724 5.5 14.1143 6.06347 14.3877 6.84933ZM14.3877 6.84933C14.4604 7.05846 14.5 7.28335 14.5 7.51755" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
)

export const Trashcan = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} fill={"none"} {...props}>
    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" strokeWidth="1.5" strokeLinecap="round"></path>
    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" strokeWidth="1.5" strokeLinecap="round"></path>
    <path d="M9.5 16.5L9.5 10.5" strokeWidth="1.5" strokeLinecap="round"></path>
    <path d="M14.5 16.5L14.5 10.5" strokeWidth="1.5" strokeLinecap="round"></path>
  </svg>
);
// export const Trashcan = (props) => (
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} color={"#333333"} fill={"none"} {...props}>
//     <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"></path>
//     <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"></path>
//     <path d="M9.5 16.5L9.5 10.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"></path>
//     <path d="M14.5 16.5L14.5 10.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"></path>
//   </svg>
// );

export const Idea = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#333333"} fill={"none"} {...props}>
    <path d="M6.08938 14.9992C5.71097 14.1486 5.5 13.2023 5.5 12.2051C5.5 8.50154 8.41015 5.49921 12 5.49921C15.5899 5.49921 18.5 8.50154 18.5 12.2051C18.5 13.2023 18.289 14.1486 17.9106 14.9992" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"></path>
    <path d="M12 1.99921V2.99921" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M22 11.9992H21" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M3 11.9992H2" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M19.0704 4.92792L18.3633 5.63503" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M5.6368 5.636L4.92969 4.92889" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M14.517 19.3056C15.5274 18.9788 15.9326 18.054 16.0466 17.1238C16.0806 16.8459 15.852 16.6154 15.572 16.6154L8.47685 16.6156C8.18725 16.6156 7.95467 16.8614 7.98925 17.1489C8.1009 18.0773 8.3827 18.7555 9.45345 19.3056M14.517 19.3056C14.517 19.3056 9.62971 19.3056 9.45345 19.3056M14.517 19.3056C14.3955 21.2506 13.8338 22.0209 12.0068 21.9993C10.0526 22.0354 9.60303 21.0833 9.45345 19.3056" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

