import React from 'react'
import PostList from '../components/PostList'
import { useDispatch,useSelector } from 'react-redux'
import { fetchPosts, deletePosts } from "../store/postSlice";
import { useEffect } from "react";
import Loading from '../components/Loading';

import { useCallback } from "react";
const Index = () => {
  const dispatch = useDispatch()
  const { records , loading, error} = useSelector((state) => state.posts)
  const { isLoggedIn } = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  const deletePost = useCallback((id) => dispatch(deletePosts(id)), [dispatch])
  return (<Loading loading={loading} error={error}>
    <PostList data={records} deletePost={deletePost} isLoggedIn={isLoggedIn}  />
  </Loading>)
}

export default Index
