import { AUTH } from '../Views/AUTH/AUTH';
import { Blogs } from '../Views/Blogs/Blogs';
import { CreateBlog } from '../Views/Blogs/CreateBlog';
import { BlogDetail } from '../Views/Blogs/BlogDetail';
import { EditBlog } from '../Views/Blogs/EditBlog';

const MyURLs = [
    {
        path: "/",
        view: AUTH,
        title: "AUTH"
    },
    {
        path: "/blogs",
        view: Blogs,
        title: "Blogs"
    },
    {
        path: "/create-blog",
        view: CreateBlog,
        title: "Create Blog"
    },
    {
        path: "/blog/:id",
        view: BlogDetail,
        title: "Blog Detail"
    },
    {
        path: "/edit-blog/:id",
        view: EditBlog,
        title: "Edit Blog"
    }
];

export default MyURLs;