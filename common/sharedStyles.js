import styled from 'styled-components';

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export const Loader = styled.div`
  opacity: ${props => (props.isLoading ? '.4' : '1')};
`;

export const Block = styled.div`
  margin-top: 20px;
`;

export const Clearfix = styled.div`
  &:before,
  &:after {
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
`;
