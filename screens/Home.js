import React , { Component } from "react";
import { View, Text , Stylesheet, Image , TouchableOpacity} from "react-native";
import { Header , AirbnRating , Icon} from "react-native-elements";
import {RFValue} from "react-native-responsive-fontsize"; 
import axios from "axios"

export default class HomeScreen extends Component{
  constructor(){
    super();
    this.state = {
      movieDetails : {}
    };
  }


componentDidMount() {
  this.getMovie();
}  

timeConvert(num) {
  var hours = Math.floor(num/60);
  var minutes = num % 60;
  return `${hours} hrs ${minutes} mins`;
}

getMovie = () => {
  const url = "https://local:host/get-movie";
  axios
  .get(url)
    .then(response =>{
      let details = response.data.data;
      details["duration"] = this.timeConvert(details.duration);
      this.setState({ movieDetails : details});
    })
    .catch(error => {
      console.log(error.message);
    })
  
};


likedMovie = () => {
  const url = "http://localhost:5000/liked-movie";
  axios
  .post(url)
  .then(response => {
    this,this.getMovie();
  })
  .catch(error =>{
    console.log(error.message)
  });
};

unlikedMovie = () => {
  const url = "http://localhost:5000/unliked-movie";
  axios 
  .post(url)
  .then(response =>{
    this.getMovie();
  })
  .catch(error => {
    console.log(error.message);
  });
};

didNotWatchedMovie = () => {
  const url = "http://localhost:5000/did-not-movie";
  axios 
  .post(url)
  .then(response => {
    this.getMovie();
  })
  .catch(error => {
    console.log(error.message);
  });
};

render(){
  const { movieDetails} = this.state;
  if (movieDetails.poster_link) {
     const {
       poster_link,
       title,
       release_date,
       duration,
       overview,
       rating
     } = movieDetails;

    return (
      <View style={Stylesheet.container}>
      <View style={Stylesheet.headerContainer}>
        <Header
         centreComponent={{
           text : "Movie Recommended",
           style : styles.headerTitle
         }}
         rightComponent = {{ icon : "search" , color : "#fff"}}
         backgroundColor={"#d500f9"}
         containerStyle = {{flex : 1}}
         />
         </View>
         <View style = {styles.subContainer}>
           <View style={styles.subTopContainer}>
             <Image style={styles.posterImage} source = {{uri : poster_link}} />
             </View>
             <View style = {styles.suBottomContainer}>
             <View style = {styles.subTopContainer}>
               <Text style={styles.title}>{title}</Text>
               <Text style={styles.subtitle}>{`${
                 release_date.split("-")[0]
               } | $duration}`}</Text>
               <View style = {styles.middleBottomContainer}>
             <View style = {{flex : 0.3}}>
              <AirbnRating
              count={10}
              reviews={["", "", "", "", ""]}
              defaultRating = {rating}
              isDisabled = {True}
              size = {RFValue(25)}
              starContainerStyle ={{marginTop : -30 }}
              />

              </View>
              <View style = {{flex : 0.7 , padding : 15}}>
                <Text style={styles.overview}>{overview}</Text>
                </View>
              <View style={styles.lowerBottomContainer}>
              <View style={styles.iconButtonContainer}>
                <TouchableOpacity onPress={this.likedMovie}>
                  <Icon 
                  reverse
                  name={"check"}
                  type={"entypo"}
                  size = {RFValue(30)}
                  color = {'#76ff03'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.unlikedMovie}>
                  <Icon 
                  reverse
                  name={"cross"}
                  type={"entypo"}
                  size = {RFValue(30)}
                  color = {'#ff1744'}
                  />
                </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                  style={styles.button}
                  onPress={this.notWatched}>
                  </TouchableOpacity>
                </View>
                </View>
              </View>
              </View>
              </View>
              </View>
              </View>
    );
  }
  return null;  
}
}