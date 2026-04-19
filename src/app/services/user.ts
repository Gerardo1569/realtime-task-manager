import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class User {

  private apiUrl = 'http://localhost:3000/users';

  async getUsers(): Promise<any[]> {
    try {
      const res = await axios.get(this.apiUrl);
      return res.data;
    } catch (error) {
      console.error('Error en getUsers', error);
      throw error;
    }
  }

  async createUser(user: any): Promise<any> {
    const res = await axios.post(this.apiUrl, user);
    return res.data;
  }

  async updateUser(id: string, user: any): Promise<any> {
    const res = await axios.put(`${this.apiUrl}/${id}`, user);
    return res.data;
  }

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
}