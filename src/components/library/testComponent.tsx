import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    background: rgb(240,240,240);
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  padding: 16px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 8px;
  padding: 8px;
`

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: #3e8e41;
  }
`

const TestComponent: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implement your login logic here
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Username" required />
        <Input type="password" placeholder="Password" required />
        <Button type="submit">Connect</Button>
      </Form>
    </Card>
  )
}

export default TestComponent