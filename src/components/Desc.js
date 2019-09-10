import React from 'react';
import axios from 'axios';

class PokeDesc extends React.Component
{ 
    constructor(props){
        super(props);
        this.state = {
           data: ""
        }

    }

    getPokes(){
        axios.get('https://pokeapi.co/api/v2/pokemon-species/'+ this.props.id)
        .then(response=>{
            console.log(response)
            if (response.data.flavor_text_entries[1].language.name == "en") {
                this.setState({
                    data: response.data.flavor_text_entries[1].flavor_text
                })
            } else if (response.data.flavor_text_entries[2].language.name == "en") {
                this.setState({
                    data: response.data.flavor_text_entries[2].flavor_text
                })
            }
            
        })
        .catch(error => console.log(error));
    }

    componentDidMount(){
        setInterval(() => {
            this.getPokes();
        }, 100);
    }


    render(){
        return(
            <div>
                <p>{this.state.data}</p>
            </div>
        )
    }
}

export default PokeDesc;