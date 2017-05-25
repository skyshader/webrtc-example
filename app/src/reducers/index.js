import { combineReducers } from 'redux';
import callSession from './callSession';
import userMedia from './userMedia';
import streams from './streams';
import socketChannel from './socketChannel';
import webRTC from './webRTC';

const rootReducer = combineReducers({
  callSession, userMedia, streams, socketChannel, webRTC
});

export default rootReducer;
