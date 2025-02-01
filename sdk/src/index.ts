import axios from "axios";

export class DocuStore {
  private static STORAGE_FACILITY_URL = 'https://docu-store.vercel.app';

  public put = async (key: string, content: string) => {
    await axios.post(`${DocuStore.STORAGE_FACILITY_URL}/put`, { key, content });
  }

  public get = async (key: string) => {
    const { data : { data : { content } } } = await axios.post(`${DocuStore.STORAGE_FACILITY_URL}/get`, { key });
    return content;
  }

  public list = async (key: string) => {
    const { data : { data : { files } } } = await axios.post(`${DocuStore.STORAGE_FACILITY_URL}/list`, { key });
    return files;
  }

  public delete = async (key: string) => {
    await axios.post(`${DocuStore.STORAGE_FACILITY_URL}/delete`, { key });
  }
}