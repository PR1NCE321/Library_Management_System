"use server";
import { PrismaClient } from "../generated/prisma";



class Book {
  id: number;
  title: string;
  author: string;
  status: string;
  imgurl?: string | null ;

  constructor(id: number, title: string, author: string ,status :string,imgurl?: string | null) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.status = status;
    this.imgurl= imgurl;
  }
}

async function FetchBooks (){
  const prisma = new PrismaClient();
  const  data = await prisma.items.findMany(); 
  const books = data.map((item)=>{
    return new Book(
       item.ItemID,
       item.ItemTitle,
      item.ItemAuther,
      item.status,
    item.imageUrl)
  })
  return books;
}


export default FetchBooks