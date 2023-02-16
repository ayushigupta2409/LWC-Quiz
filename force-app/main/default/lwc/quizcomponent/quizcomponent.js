import { LightningElement } from 'lwc';

export default class Quizcomponent extends LightningElement {
    //properties:-
    myquestions=[
        {
            id:"question1",
            question:"how many custom profiles are possible in SF?",
            answers:{
                a:"20-22",
                b:"2-3",
                c:"5-6",
                d:"10-15"
            },
            correctanswer:"b"
        },
        {
            id:"question2",
            question:"how many report types are there in SF?",
            answers:{
                a:"5",
                b:"12",
                c:"2",
                d:"4"
            },
            correctanswer:"c"
        },
        {
            id:"question3",
            question:"how many type of reports are there in SF?",
            answers:{
                a:"4",
                b:"2",
                c:"15",
                d:"None"
            },
            correctanswer:"a"
        },
    ]//public property-'myquestions',datatype -'array of objects',purpose-array of objects where each object is a single question
    selected={} //public property-'selected',datatype-'object': since we have to store answers, purpose- object that stores the value of the option selected
    score=0 //calculate score
    isSubmitted = false; //public property, datatype-'boolean'

    //methods and getters:-
    get scoreIsFull(){
        return `slds-text-heading_large ${this.myquestions.length === this.score? 'slds-text-color_success': 'slds-text-color_error' }`
    }/*whenever we want to make something dynamic in html we use getters.
    Inside {} we use ternary operator/ condition{condition? ifTrue: ifFalse} to check if score is full.
    If condition is true: color of text is green{success}
    else: color of text is red{error}
    whatever string is returned, that particular string is applied as class to the div.
    The whole return statement is put in back ticks(String interpolation is used)
    therefore this getter applies dynamic styling to our component
    */
    get allNotSelected(){
        return !(Object.keys(this.selected).length === this.myquestions.length)
    }/*getter- used for disabling the submit btn if there are unanswered questions
    logic-equate the no.of questions with the length of array of keys from selected/ answered questions
    */
    changehandler(event){
        console.log("name",event.target.name)
        console.log("value",event.target.value)
        //now we do object destructuring to fetch name and value from target
        /*above notation is equivalent to:-
            const name = event.target.name
            const value = event.taregt.value
        */
        const {name,value} = event.target
        //spreading:-, then take name property as key and store value along the name property
        //["question1"]:"a"
        this.selected = {...this.selected, [name]:value}   
    }//gets called on every click of option, handles option selection
    submithandler(event){
        event.preventDefault()
        let correct = this.myquestions.filter(item=>this.selected[item.id] === item.correctanswer)
        //filter always returns an array
        this.score = correct.length
        console.log('score',this.score)
        this.isSubmitted = true;
    }/*forms always refresh the page, so to avoid refreshing we use event.preventDefault()
    the method submits the form
    */
    resethandler(event){
        this.selected = {}
        this.score = 0
        this.isSubmitted = false;
    }//resets/ clears the form
}