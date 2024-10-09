import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const PostListItem = ({ data, deletePost , isLoggedIn }) => {
  const navigate = useNavigate()
  const deleteHandler = (item) => {
    if (
      window.confirm(`Are you sure you want to delete this item? ${item.title}`)
    ) {
      deletePost(item.id);
    }
  };
  const records = data.map((el, index) => (
    <tr key={el.id}>
      <td>#{++index}</td>
      <td><Link to={`post/details/${el.id}`}>{el.title}</Link></td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={() => navigate(`post/edit/${el.id}`)} variant="success">Edit</Button>
          <Button disabled={!isLoggedIn} onClick={() => deleteHandler(el)} variant="danger">
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <> {records} </>;
};

export default PostListItem;
