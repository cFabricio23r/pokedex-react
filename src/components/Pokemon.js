import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
class Pokemon extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            id: "",
            sprites: ""
        }
    }
    
    componentDidMount(){
        setInterval(() => {
            this.getPokes();
        }, 500)
    }

    getPokes(){
        axios.get('https://pokeapi.co/api/v2/pokemon/'+ this.props.id)
        .then(response=>{
            console.log(response)
            this.setState({sprites: response.data.sprites.front_default, id:response.data.id})
        })
        .catch(error => console.log(error));
    }
    
    render(){
       
        return (
            <Link
            to={`/pokemon/${this.state.id}`}> 
            <div className="flex flex-col justify-center items-center max-w-sm rounded shadow-lg m-4 bg-white p-4">
                <div>
                    <img src={this.state.sprites} className="h-24"/>
                </div>
                <div>
                    <p clasName="text-xl">{this.props.id}</p>
                </div>  
            </div> 
            </Link>         
        )
    }
}

export default Pokemon;