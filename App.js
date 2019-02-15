import React, {Component} from 'react'
import {Container, Header, 
  Content, Footer, Left,Right, Body, List , Text, Icon ,Button, Item, Input, Card, CardItem, Thumbnail} from 'native-base';
import { Alert, Image } from 'react-native'
import axios from 'axios'

export default class Home extends Component {
 constructor(){
   super()
   this.state={ 
    nama: '',
    Restoran: []
  }
 }
 getapi = ()=>{
   var url= `https://developers.zomato.com/api/v2.1/search?q=${this.state.nama}`
   var config = {
    headers:{'user-key':'09c8895b6e41ce39866ef22f743c57aa'}
   }
   axios.get(url,config)
      .then((ambil) =>{
        this.setState ({
          Restoran : ambil.data.restaurants
        })

      })
      .catch((err)=>{
        Alert.alert('eror')

      })
 }
  
    // Alert.alert(this.state.nama)
  
  render() {
    const dataPlayer= this.state.Restoran.map((hasil,i)=>{
      const nama = hasil.restaurant.name
      const lokasi = hasil.restaurant.location.address
      const kota = hasil.restaurant.location.city
      const harga = hasil.restaurant.average_cost_for_two * 198.37;
      let number_string = harga.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);
      if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah + separator + ribuan.join('.')
      }
      
      const foto = hasil.restaurant.thumb;
      const foto2 = 'https://www.interserver.net/tips/wp-content/uploads/2016/10/404error.jpeg';
      if (foto == null) {
        foto = foto2
      }

      return(
        <Card>
        <CardItem style={{backgroundColor: 'pink'}}>
          <Left>
            <Thumbnail source={{uri: foto}} />
            <Body>
              <Text>{nama}</Text>
              <Text note>{kota}</Text>
            </Body>
          </Left>
          <Right>
            <Text>Rp. {number_string} </Text>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: foto}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
        <CardItem style={{backgroundColor: 'pink'}}>
          <Left>
              <Text>{lokasi}</Text>
          </Left>
        </CardItem>
      </Card>
        )
    })
    
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: 'red'}}>
          <Item>
            <Icon name='search'/>
            <Input placeholder='Cari Menu makanan......'
            onChangeText={(e)=>{this.setState({nama: e})}}
            />
          </Item>
          
        </Header>
        <Content>
          <Button full iconLeft danger onPress={this.getapi}>
          
          <Text>Lihat Daftar Restoran</Text>
          </Button>
          <List>
            {dataPlayer}
          </List>
        </Content>
        <Footer style={{backgroundColor: 'red'}}></Footer>
      </Container>
    )
    }
  }
