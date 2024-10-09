import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const posts = await axios.get("http://localhost:8000/posts");
      return posts.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePosts = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`http://localhost:8000/posts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertPosts = createAsyncThunk(
  "posts/createPost",
  async (data, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { users } = getState();
    const id = users.id;
    try {
      const post = await axios.post(
        "http://localhost:8000/posts",
        JSON.stringify({
          title: data.title,
          description: data.description,
          userId: id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return post.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const post = await axios.get(`http://localhost:8000/posts/${id}`);
      return post.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePosts = createAsyncThunk(
  "posts/updatePost",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.put(
        `http://localhost:8000/posts/${data.id}`,
        JSON.stringify({
          title: data.title,
          description: data.description,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  records: [],
  loading: false,
  error: null,
  record: {},
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearRecord: (state )=>{
      state.record = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(insertPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(insertPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(updatePosts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(updatePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deletePosts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter(
          (record) => record.id !== action.payload
        );
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { cleanRecord } = postSlice.actions;
export default postSlice.reducer;
