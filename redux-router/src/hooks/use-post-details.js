import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostById } from '../store/postSlice'
import { useParams } from 'react-router-dom'

const usePostDetails = () => {
  const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchPostById(id))
    }, [dispatch,id])
    const { record , loading , error } = useSelector(state => state.posts)
  return {loading , error, record}
}

export default usePostDetails
