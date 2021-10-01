import React, {useState, useEffect} from "react";
import { ScrollView } from 'react-native';

import { Container, 
        SearchContainer, 
        Input, 
        SearchButton, 
        Title, 
        Banner, 
        BannerButton,
        SliderMovie } from './styles';

import Header from "../../components/Header";
import {Feather} from '@expo/vector-icons'

import SliderItem from "../../components/SliderItem";

import api, {key} from '../../services/api';
import { getListMovies } from "../../utils/movie";

function Home(){

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);


    useEffect(()=>{
        let isActive = true;

        async function getMovies(){

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])

            const nowList = getListMovies(10, nowData.data.results);
            const popularList = getListMovies(10, popularData.data.results);
            const topList = getListMovies(10, topData.data.results);

            setNowMovies(nowList)
            setPopularMovies(popularList)
            setTopMovies(topList)

        }

        getMovies();

    }, [])

    return(
        <Container>
            <Header title="React Prime" />

            <SearchContainer>
                <Input
                    placeholder="Pesquisar..."
                    placeholderTextColor="#ddd"
                />
                <SearchButton>
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>
            </SearchContainer>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>

                <BannerButton activeOpacity={0.9} onPress={ () => alert('TESTE')} >
                    <Banner 
                    resizeMethod="resize"
                    source={{ uri: 'https://i.imgur.com/e6dZ7Y0.png' }}
                    />
                </BannerButton>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={ ({ item }) => <SliderItem data={item} /> }
                />

                <Title>Populares</Title>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={ ({ item }) => <SliderItem data={item} /> }
                />
  
                <Title>Mais Votados</Title>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={ ({ item }) => <SliderItem data={item} /> }
                    keyExtracor={(item) => String(item.id) }
                />

            </ScrollView>

        </Container>
    )
}

export default Home;