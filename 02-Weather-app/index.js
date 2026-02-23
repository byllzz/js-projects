// let cityInputValue = "mumbai";

// var apiKey = "b1fd6e14799699504191b6bdbcadfc35";
//     var unit = "metric";
//     var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${unit}`;

//     console.log(apiUrl);

//     fetch(apiUrl).then(response => response.json()).then(data => {
//       console.log(data);
//     })



  const styles = {
    // wrapper
   wrapperStyles : {width : 100 , height : 100 , maxWidth : 1200 , marginX : "auto" , padding : 20 ,display :"flex" , flexDirection : "column" , alignItems: "center" , gap : 20 , border :"1px solid red" } ,
   inputStyles : {
    width : 100 , maxWidth : 400 , marginX : "auto" ,height : 50 , paddingInline : 20 , paddingBlock : 5 , borderRadius : 999 , fontSize : 18
   } ,
  }
  function wrapper (){
   const wrapper = document.createElement("div");
   wrapper.style.width = `${this.wrapperStyles.width}%`
   wrapper.style.maxWidth = `${this.wrapperStyles.maxWidth}px`
   wrapper.style.height = `${this.wrapperStyles.height}vh`
   wrapper.style.marginInline = this.wrapperStyles.marginX;
   wrapper.style.padding = `${this.wrapperStyles.padding}px`
   wrapper.style.display = this.wrapperStyles.display;
   wrapper.style.flexDirection = this.wrapperStyles.flexDirection;
   wrapper.style.alignItems = this.wrapperStyles.alignItems;
   wrapper.style.gap = `${this.wrapperStyles.gap}px`;
   wrapper.style.border = this.wrapperStyles.border;

  //  append to body
   document.body.appendChild(wrapper);

  wrapper.innerHTML = `
<input
type="search"
id="input_field"
placeholder = "Search City"
style="width:${this.inputStyles.width}%; max-width:${this.inputStyles.maxWidth}px; height:${this.inputStyles.height}px; border-radius : ${this.inputStyles.borderRadius}px; padding-block : ${this.inputStyles.paddingBlock}px; padding-inline: ${this.inputStyles.paddingInline}px; margin-inline : ${this.inputStyles.marginX}; font-size : ${this.inputStyles.fontSize}px"/>
<h1 id="city-title">Search City...</h1>
`;
  }
  wrapper.call(styles);

const input = document.querySelector('#input_field');
const cityTitle  =document.querySelector("#city-title");
const search_cities = [];
 input.addEventListener("change" , function (e) {
      let city = e.target?.value.trim();
  if(!city || city === "") return console.error("Please enter city name!");
      cityTitle.textContent = city.toUpperCase();
      e.target.value = "";
      search_cities.unshift(city);
      console.log(search_cities);

      localStorage.setItem("city-name" , city);
});

     window.addEventListener('load', () => {
        let city = input?.value.trim();
        let storeCityName = localStorage.getItem('city-name');
        cityTitle.textContent = storeCityName.toUpperCase();

     });



