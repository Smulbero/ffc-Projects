import { configureStore } from '@reduxjs/toolkit'

const MARKDOWN = ''

const initialState = {
  markdown: MARKDOWN,
  currentMarkdown: 'Initial markdown content',
};

const SET_MARKDOWN = 'SET_MARKDOWN';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKDOWN:
      return state.currentMarkdown = action.content;
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