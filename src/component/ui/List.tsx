import React from 'react'
import styled from 'styled-components'

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    column-gap: 1rem;
    align-items: center;
    border-bottom: 1px solid #d7dee8;
`

const Label = styled.h3`
    color: #9ea9b7;
`

const Data = styled.h3`
    justify-self: end;=
`

interface ListProps {
    label: string
    data: string
}

const List = ({ label, data }: ListProps) => {
    return (
        <ListContainer>
            <Label>{label}</Label>
            <Data>{data}</Data>
        </ListContainer>
    )
}

export default List
