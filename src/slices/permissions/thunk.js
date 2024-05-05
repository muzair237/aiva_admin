import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from '../../components/Molecules/Toast';
import { Fetch } from '../../helpers/fetchWrapper';
import { GET_ALL_PERMISSIONS, GET_UNIQUE_PARENTS } from '../../helpers/url_helper';

const permissionThunk = {
  url: `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/permission`,

  getAllPermissions: createAsyncThunk(
    'permission/getAllPermissions',
    async ({ page = 1, itemsPerPage = 10, getAll = false, searchText = '', sort = '', type = '' }) => {
      try {
        let res = await Fetch.get(
          `${permissionThunk.url}/${GET_ALL_PERMISSIONS}?page=${page}&itemsPerPage=${itemsPerPage}&getAll=${getAll}&searchText=${searchText}&sort=${sort}&type=${type}`,
        );
        if (res.status >= 200 && res.status < 300) {
          res = await res.json();
          return res;
        }
        const { message } = await res.json();
        throw new Error(message ?? 'Something Went Wrong');
      } catch ({ message }) {
        Toast({
          type: 'error',
          message,
        });
        throw message;
      }
    },
  ),

  getUniqueParents: createAsyncThunk('permission/getUniqueParents', async () => {
    try {
      let res = await Fetch.get(`${permissionThunk.url}/${GET_UNIQUE_PARENTS}`);
      if (res.status >= 200 && res.status < 300) {
        res = await res.json();
        return res?.parentPermissions;
      }
      const { message } = await res.json();
      throw new Error(message ?? 'Something Went Wrong');
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
      throw message;
    }
  }),
};

export default permissionThunk;
