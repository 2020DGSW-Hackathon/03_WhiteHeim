import { observable } from 'mobx';
import { autobind } from 'core-decorators';
import axios from 'axios';
const SERVER = require('./config');
import { getToken } from '../lib/token';

@autobind
class PostStore {
  @observable list = [];
  @observable filterList = [];
  @observable post = {};

  getPost = async (idx) => {
    const token = getToken();
    try {
      const resp = await axios.get(`${SERVER.default}/api/post/${idx}`, {
        headers: {
          user: token,
        }
      });
      const { data } = resp.data;
      this.post = data.post;
    } catch (err) {
      console.log(err);

    }
  }

  getPostList = async (keyword) => {
    try {
      let url = `${SERVER.default}/api/post`;
      if (keyword) {
        url = `${SERVER.default}/api/post?keyword=${keyword}`;
      }

      const resp = await axios.get(url);
      const { data } = resp.data;
      this.list = data.posts;
      this.filterList = this.list;
    } catch (err) { }
  }

  getSlang = async () => {
    try {
      const resp = await axios.get(`${SERVER.default}/api/slang`);
      this.filterList = resp.data.data.slang;
    } catch (err) {
      console.log(err);
    }
  }

  listFilterWithCategory = (category) => {
    this.filterList = this.list.filter(item => item.category == category);
  }

  getPostListByKeyword = (keyword) => {
    this.filter = this.getPostList(keyword);
  }
}

export default new PostStore();
