import { Button } from "@material-ui/core";
import styled from "styled-components";

export const StyledButtonInformation = styled(Button)`
  color: #6a008f;
  margin: 8px;
  border: 1px solid #6a008f;
  height: 39px;
  font-size: 0.75rem;
  &:hover {
    background-color: #6a008f;
    color: white;
  }
`;
export const StyledButtonRefresh = styled(Button)`
  color: green;
  margin: 8px;
  border: 1px solid green;
  height: 39px;
  font-size: 0.75rem;
  &:hover {
    background-color: green;
    color: white;
  }
`;

export const StyledButtonSearch = styled(Button)`
  color: blue;
  margin: 8px;
  border: 1px solid blue;
  height: 39px;
  font-size: 0.75rem;
  &:hover {
    background-color: blue;
    color: white;
  }
`;

export const StyledButtonPrint = styled(Button)`
  color: lightpink;
  margin: 8px;
  border: 1px solid lightpink;
  height: 39px;
  font-size: 0.75rem;
  &:hover {
    background-color: lightpink;
    color: white;
  }
`;

export const StyledButtonGoToPage = styled(Button)`
  color: #f73378;
  border: 1px solid #f73378;
  height: 35px;
  font-size: 0.75rem;
  margin-left: 3px;
  &:hover {
    background-color: #f73378;
    color: white;
  }
`;

export const StyledButtonLogOut = styled(Button)`
  color: white;
  border: 1px solid white;
  height: 35px;
  font-size: 0.75rem;
  margin-left: 3px;
  &:hover {
    background-color: #6a008f;
    color: white;
  }
`;
