import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {  updatePosts } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import withGuard from "../util/withGuard";
import { postSchema } from "../util/validationPost";
import { useFormik } from "formik";
const EditPost = () => {
  
  const { record, loading, error } = usePostDetails();
  const dispatch = useDispatch();

  const navigate = useNavigate();


  useEffect(() => {
    return () => {
      dispatch({ type: "posts/cleanRecord" });
    };
  }, [dispatch]);


  
  const formik = useFormik({
    initialValues: {
      title:  record?.title || '',
      description:  record?.description ||\ '',
    },
    validationSchema: postSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(
        updatePosts({
          id: record.id,
          title: values.title,
          description: values.description,
        })
      ).unwrap().then(() => navigate(`/`));
    },
  });

  return (
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={formik.values.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={formik.handleChange}
            isInvalid={formik.errors.title}
          />
        {formik.errors.title && formik.touched.title && (
          <div className="text-danger">{formik.errors.title}</div>
        )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={formik.values.description}
            as="textarea"
            rows={3}
            name="description"
            isInvalid={formik.errors.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description && (
            <div className="text-danger">{formik.errors.description}</div>
          )}
        </Form.Group>
        <Loading loading={loading} error={error}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </Loading>
      </Form>
  );
};

export default withGuard(EditPost) ;
