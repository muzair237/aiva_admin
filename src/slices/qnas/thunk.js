import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from '../../components/Molecules/Toast';
import { Fetch } from '../../helpers/fetchWrapper';
import { GET_ALL_QUESTIONS } from '../../helpers/url_helper';

const questionColumns = {
  url: `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/QnA`,

  getAllQuestions: createAsyncThunk(
    'question/getAllQuestions',
    async ({
      page = 1,
      itemsPerPage = 10,
      getAll = false,
      startDate = '',
      endDate = '',
      searchText = '',
      sort = '',
    }) => {
      try {
        let res = await Fetch.get(
          `${questionColumns.url}/${GET_ALL_QUESTIONS}?page=${page}&itemsPerPage=${itemsPerPage}&getAll=${getAll}&startDate=${startDate}&endDate=${endDate}&searchText=${searchText}&sort=${sort}`,
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

  //   createAdmin: createAsyncThunk('admin/createAdmin', async ({ payload, setIsOpen, refetch }) => {
  //     try {
  //       let res = await Fetch.post(`${questionColumns.url}/${CREATE_ADMIN}`, payload);
  //       if (res.status >= 200 && res.status < 300) {
  //         res = await res.json();
  //         refetch(prev => !prev);
  //         setIsOpen(prev => !prev);
  //         Toast({
  //           type: 'success',
  //           message: 'Admin Created Successfully!',
  //         });
  //         return res;
  //       }
  //       const { message } = await res.json();
  //       throw new Error(message ?? 'Something Went Wrong');
  //     } catch ({ message }) {
  //       Toast({
  //         type: 'error',
  //         message,
  //       });
  //       throw message;
  //     }
  //   }),

  //   editAdmin: createAsyncThunk('admin/editAdmin', async ({ id, payload, setIsOpen, refetch }) => {
  //     try {
  //       let res = await Fetch.put(`${questionColumns.url}/${EDIT_ADIMN}/${id}`, payload);
  //       if (res.status >= 200 && res.status < 300) {
  //         res = await res.json();
  //         refetch(prev => !prev);
  //         setIsOpen(prev => !prev);
  //         Toast({
  //           type: 'success',
  //           message: 'Admin Information Edited Successfully!',
  //         });
  //         return res;
  //       }
  //       const { message } = await res.json();
  //       throw new Error(message ?? 'Something Went Wrong');
  //     } catch ({ message }) {
  //       Toast({
  //         type: 'error',
  //         message,
  //       });
  //       throw message;
  //     }
  //   }),

  //   deleteAdmin: createAsyncThunk('admin/deleteAdmin', async ({ adminToDelete, setDeleteModal, refetch }) => {
  //     try {
  //       let res = await Fetch.delete(`${questionColumns.url}/${DELETE_ADMIN}/${adminToDelete}`);
  //       if (res.status >= 200 && res.status < 300) {
  //         res = await res.json();
  //         refetch(prev => !prev);
  //         setDeleteModal(false);
  //         Toast({
  //           type: 'success',
  //           message: 'Admin Deleted Successfully!',
  //         });
  //         return res;
  //       }
  //       const { message } = await res.json();
  //       throw new Error(message ?? 'Something Went Wrong');
  //     } catch ({ message }) {
  //       Toast({
  //         type: 'error',
  //         message,
  //       });
  //       throw message;
  //     }
  //   }),
};

export default questionColumns;
