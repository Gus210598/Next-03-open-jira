import { FC } from "react"
import Head from "next/head"

import { Box } from "@mui/system"
import { Navbar, Sidebar } from "../ui";

interface Props {
    children: any;
    title?: string;
}

export const Layout: FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx= {{ flexGrow: 1 }} >
        <Head>
            <title>{ title }</title>
        </Head>
        <Navbar />
        <Sidebar />

        <Box sx={{ padding: '10px 20px' }}>
            { children }
        </Box>
        
        
    </Box>
  )
}
