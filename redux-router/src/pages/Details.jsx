import { useEffect } from "react";
import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
const Details = () => {
  const { record, loading, error } = usePostDetails();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({ type: "posts/cleanRecord" });
    };
  }, [dispatch]);
  return (
    <div>
      <Loading error={error} loading={loading}>
        <p>Title: {record?.title}</p>
        <p>Description: {record?.description}</p>
      </Loading>
    </div>
  );
};

export default Details;
