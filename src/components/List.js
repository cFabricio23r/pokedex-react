import React from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PokeDetails from './PokeDetails'


class PokeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Pokes: [],
            Index: 0,
            offset: 0,
        }
    }


    componentDidMount() {
        setInterval(() => {
            this.getPokes();
        }, 1000)
    }

    PageBack() {


        if (this.state.offset == 0) {
            this.setState({
                offset: this.state.offset
            });
            this.componentDidMount();
        } else {
            this.setState({
                offset: this.state.offset - 9
            });
            this.componentDidMount();
        }
        console.log(this.state.offset);
    }

    PageNext() {

        this.setState({
            offset: this.state.offset + 9
        });
        this.componentDidMount();
        console.log(this.state.offset);

    }
    getPokes() {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${this.state.offset}&limit=9`)
            .then(response => {
                console.log(response)
                this.setState({ Pokes: response.data.results })
            })
            .catch(error => console.log(error));
    }



    render() {
        let { Pokes = [] } = this.state;
        return (

            <
            Router >
            <
            div className = "flex flex-row justify-center items-center pt-12 h-screen" >
            <
            div className = "w-1/6" >

            <
            /div> <
            div className = "w-5/6 flex flex-row justify-start items-start bg-blue-200 p-8" >
            <
            div className = "w-1/2 flex flex-row flex-wrap justify-center items-center" > {
                Pokes.map((PokeList) =>
                    <
                    div className = "w-1/3" >

                    <
                    Pokemon id = { PokeList.name }
                    />  < /
                    div >
                )
            } <
            div className = "flex flex-row justify-around items-center py-8" >
            <
            div className = "w-1/8" >
            <
            button className = "w-1/8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded text-4xl"
            onClick = {
                () => this.PageBack()
            } > Back < /button> < /
            div > <
            div className = "w-6/8 px-20" >
            <
            div > < /div> < /
            div > <
            div className = "w-1/8" >
            <
            button className = "w-1/8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded text-3xl"
            onClick = {
                () => this.PageNext()
            } > Next < /button> < /
            div > <
            /div>

            <
            /div> <
            div className = "w-1/2 flex flex-row flex-wrap justify-start items-start" >
            <
            Route exact path = "/"
            component = { Home }
            /> <
            Route path = "/pokemon/:id"
            component = { PokeMob }
            /> < /
            div > <
            /div> <
            div className = "w-1/6" >

            <
            /div> < /
            div >

            <
            /Router>

        )
    }

}


function Home() {
    return ( <
        div >
        <
        p > Home < /p> < /
        div >
    )
}

function PokeMob({ match }) {
    return ( <
        PokeDetails id = { match.params.id }
        />
    )
}

export default PokeList;