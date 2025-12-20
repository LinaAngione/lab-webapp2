# Exercise 7: React Q&A

_Goal: First steps with React applications. Create a "HeapOverrun" question page based on a tree of components (and props). Then, add the state._

## 0. Creating a project

Create a new React project called **react-qa**, activate it and explore its files. Insert into `App.jsx` the code for loading a 'fake' set of questions and answers in JavaScript objects. For those objects, re-use the same data structures created for Exercises 3-4.

## 1. Defining the component tree

Starting from the screen of the "HeapOverrun" question page (see Exercise 6), make a list of the components that you need to recreate the page.

For each component, list the information (`prop`s) that are required by that component (and/or by any other enclosed component).

## 2. Implementing the components

Create a file `Components.jsx`, and define the React components as functions, and modify the App to render those components.

The components should **not** be interactive, yet. 

## 3. Adding the state

Define where to put the state in the app and how many state variables you need, reflecting on the pros and cons. 

Use the 'fake' set of questions and answers to initialize the state. Update the existing components accordingly.

Nel componente radice (App) - SCELTA CONSIGLIATA
Pro: App è il "padre comune" di tutto. Mettendo lo stato qui, possiamo passare i dati (answers) a AnswersList per visualizzarli, e magari un domani a un componente Sidebar o Header. È la "Single Source of Truth" (Unica fonte di verità).

Contro: Bisogna passare le funzioni di modifica (come voteUp) giù attraverso le props (Prop Drilling).

Verdetto: Sì. È la pratica standard per applicazioni di queste dimensioni.