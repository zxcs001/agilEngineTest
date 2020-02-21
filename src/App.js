import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';

class App extends Component {

    constructor(props) {
		super(props)
		this.state = {
            text: 'abc',
            index:-1,
            items:[],
            function: '',
            value: '',
            itemIndex:-2,
            isLoaded: false,
            isReplaced: false,
            error: '',
            symitems: [],
            currentSytle:'default',
        }   
    }
    
    // Update text style
    styleUpdate = (style) => {
        let stateCopy = Object.assign({}, this.state);
        let index = this.state.itemIndex;
        this.setState({currentSytle: style});
        if(index > -2 && !this.state.isReplaced){
            stateCopy.items[index] = <span 
            key={index} 
            id={index} 
            onClick={() => this.updateContent(index)}
            tabIndex={index}
            className={style}>
            {this.state.value} </span>;

            this.setState(stateCopy);
            this.setState({index: -2});
        }

    }

    getText = () => {
        var that = this;
        getMockText().then(function (result) {
            if(result.length>0){
                that.setState({text: result});
                that.setState({items: that.itemWrapper()});
            }
        });
            
    }

    stringSpliter =() => {
        const textString = this.state.text;
        return textString.split(" ");
    }
    // To get synonyms

    updateContent =(index, value) => {
        this.setState({itemIndex: index});
        this.setState({value: value});
        this.setState({isReplaced: false});
        fetch("https://api.datamuse.com/words?ml="+value)
            .then(res => res.json())
            .then(
                (result) => {
                this.setState({
                    isLoaded: true,
                    symitems: this.itemWrapperSym (result)
                });;
            },
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
      )
    }

    // To switch synonyms with original text
    updateContentSym = (index, val) => {
        let stateCopy = Object.assign({}, this.state);
        this.setState({isReplaced: true});
        this.setState({value:val});
        if(index > -2){
            stateCopy.items[index] = <span 
            key={index} 
            id={index} 
            onClick={() => this.updateContent(index)}
            tabIndex={index}
            className={this.state.items[index].props.className}>
            {val} </span>;

            this.setState(stateCopy);
            this.setState({index: -2});
        }
    }

    // generate synonyms text with span
    itemWrapperSym = (result) =>{
        const text = [];
        for (const [index, value] of result.entries()) {
            text.push(
            <span 
                key={index} 
                id={index} 
                onClick={() => this.updateContentSym(this.state.itemIndex, value.word)}
                tabIndex={index}
                className={'default'}>
                {value.word} </span>
            )
        }
        return text;
    }

    // generate text with span
    itemWrapper =() =>{
        const items = this.stringSpliter();
        const text = [];
        for (const [index, value] of items.entries()) {
            text.push(
            <span 
                key={index} 
                id={index} 
                onClick={() => this.updateContent(index, value)}
                tabIndex={index}
                className={'default'}>
                {value} </span>
            )
        }
        return text;
    }


    componentDidMount(){
        this.getText();
    }
    
    
    render() {
        return (
            <div className="App">
                <header>
                    <span onClick={this.getText}>Simple Text Editor</span>
                </header>
                <main>
                    <div className="sym-container">
                        <div>Synonyms</div>
                        <div className="sym-render">
                           {this.state.symitems}
                        </div>
                    </div>
                    <div id="format-actions">
                        <button className="format-action" type="button" onClick ={() => this.styleUpdate('blod')}><b>B</b></button>
                        <button className="format-action" type="button" onClick ={() => this.styleUpdate('italic')}><i>I</i></button>
                        <button className="format-action" type="button" onClick ={() => this.styleUpdate('underline')}><u>U</u></button>
                    </div>
                    <FileZone mockText={this.state.items}/>
                </main>
            </div>
        );
    }
}

export default App;
