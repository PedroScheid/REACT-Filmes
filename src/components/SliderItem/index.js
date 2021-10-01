import React from "react";

import { Container,
         BannerItem,
         Title,
         RateContainer,
         Rate
         } from './styles'

import { Ionicons } from '@expo/vector-icons'

function SliderItem(){
    return(
        <Container activeOpacity={0.7}>
            <BannerItem
                source={{ uri: 'https://i.imgur.com/e6dZ7Y0.png' }}
            />

            <Title numberOfLines={1} >Vingadores</Title>
            <RateContainer>
                <Ionicons name="md-star" size={12} color="#E7A74e" />
                <Rate>9/10</Rate>
            </RateContainer>
        </Container>
    )
}

export default SliderItem;