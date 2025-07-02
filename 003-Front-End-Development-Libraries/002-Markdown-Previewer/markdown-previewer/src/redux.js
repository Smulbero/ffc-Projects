import { configureStore } from '@reduxjs/toolkit'


const initialState = {
  currentMarkdown: `# Markdown previewer test

## Link
Link to [freeCodeCamp](www.freecodecamp.org)

## Inline Code
\`Inline Code\`

## Code block
\`\`\`
    <html>
     <p>This is inside of a code block</p>
    </html>
\`\`\`
## Unordered list
+ List item 1
+ List item 2
+ List item 3

## Blockquote
> This is a blockquote
>> Nested blockquote

## Image
![freecodecamp logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

## Bolded Text
**This text is bolded**`
};

const SET_MARKDOWN = 'SET_MARKDOWN';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKDOWN:
      return{
        ...state,
        currentMarkdown: action.content
      };
    default:
      return state;
  }
}

const store = configureStore({reducer});

const setMarkdown = (content) => {
  return {
    type: SET_MARKDOWN,
    content
  }
}

const mapStateToProps = (state) => {
  return {
    markdown: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMarkdown: (content) => dispatch(setMarkdown(content))
  }
}

export {
  store,
  mapStateToProps,
  mapDispatchToProps,
}
