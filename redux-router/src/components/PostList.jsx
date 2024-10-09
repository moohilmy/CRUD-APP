import { Table } from "react-bootstrap";
import PostListItem from "./PostListItem";
import { memo } from "react";
const PostList = ({ data, deletePost, isLoggedIn }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>
        <PostListItem
          data={data}
          deletePost={deletePost}
          isLoggedIn={isLoggedIn}
        />
      </tbody>
    </Table>
  );
};

export default memo(PostList);
 