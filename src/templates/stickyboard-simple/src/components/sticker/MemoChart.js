import React from 'react';
import styled from 'styled-components';

const Input = styled.textarea`
  width: 80%;
  height: 80%;
  border: 1px solid;
  padding: 10px;
  resize: none;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const MemoChart = ({text, onChange}) => {
    return (
      <Container>
        <Input value={text} onChange={onChange}/>
      </Container>
    )
}

export default MemoChart;