import React from 'react';
import axios from 'axios';
import Desc from './Desc';

class PokeDetails extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            sprites: "",
            ShinyF: "",
            ShinyB: "",
            name: "",
            type: []
        }

    }

    getPokes(){
        axios.get('https://pokeapi.co/api/v2/pokemon/'+ this.props.id)
        .then(response=>{
            console.log(response)
            this.setState({
                sprites: response.data.sprites.front_default,
                ShinyF: response.data.sprites.front_shiny,
                ShinyB: response.data.sprites.back_shiny,
                name: response.data.name,
                type: response.data.types
            })
            console.log(this.state.type)
        })
        .catch(error => console.log(error))
    }
    
    componentDidMount(){

        setInterval(() => {
            this.getPokes();
            if(this.props.id < 100){
                this.setState({
                    id: 0 + this.props.id
                })
            } else if(this.props.id < 10){
                this.setState({
                    id: 0 + this.state.id
                })
            } else {
                this.setState({
                    id: this.props.id
                })
            }
            
        }, 10);
        
    };
    
    render(){
       
        return (
            <div className="w-full flex flex-col">
                <div className="flex justify-center items-center">
                    <img src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other-sprites/official-artwork/${this.props.id}.png?raw=true`} className="h-64"/>
                </div>
                <div className="flex flex-row items-center justify-around bg-white px-4 rounded-lg my-6">
                    <div className="w-2/8">
                        <p className="font-bold text-xl">No: {this.state.id}</p>
                    </div>
                    <div className="w-3/8">
                        <p className="font-bold text-3xl">{this.state.name}</p>
                    </div>
                    <div className="w-3/8 flex flex-row flex-wrap">
                    {this.state.type.map((typexd)=> <div><img className="h-4" src={`https://raw.githubusercontent.com/cFabricio23r/PokemonType/master/${typexd.type.name}.jpg`} /></div>)}
                    </div>
                </div>
                <div>
                    <p className="font-bold text-2xl">Profile</p>
                </div>
                <div className="bg-white px-4 rounded-lg mb-6 py-4">
                    <Desc id={this.props.id}/>
                </div>
                <div>
                    <h2 className="font-bold text-lg">Shiny Form</h2>
                    <div className="flex flex-row justify-between items-center">
                        <div className="w-1/2 flex flex-col items-center">
                            <h4 className="font-bold">Front</h4>
                            <img src={this.state.ShinyF}/>
                        </div>
                        <div className="w-1/2 flex flex-col items-center">
                            <h4 className="font-bold">Back</h4>
                            <img src={this.state.ShinyB}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PokeDetails;