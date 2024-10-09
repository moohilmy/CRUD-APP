import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { insertPosts } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import { useFormik} from 'formik'
import Loading from "../components/Loading";
import withGuard from "../util/withGuard";
import { postSchema } from "../util/validationPost";
const AddPost = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { error, loading } = useSelector((state) => state.posts);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: postSchema,
    onSubmit: values => {
      
      dispatch(insertPosts({title: values.title, description: values.description}))
      .unwrap()
      .then(() => {
        navigation("/");
      })
      .catch((err) => console.log(err));
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
          onChange={formik.handleChange}
          isInvalid={formik.errors.description}

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

export default withGuard(AddPost);
