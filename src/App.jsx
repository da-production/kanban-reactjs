import { Container, Heading, SimpleGrid } from "@chakra-ui/react"
import Task from "./components/Task"
import Column from "./components/Column"
import { ColumnType } from "./utils/enums"
import Logo from './assets/logo.png'

const logoStyle ={
    margin: '0 auto'
}

export default function App()
{
  return (
    <>
      <Heading
        fontSize={{base: '4xl', sm:'5xl', md:'6xl'}}
        fontWeight="blod"
        textAlign="center"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        mt={4}
      >
        <img src={Logo} style={logoStyle} alt="DnD Kanban" title="DnD Kanban" width={100} />
        DnD Kanban
      </Heading>
      <Container maxWidth="container.lg" px={4} py={10}>
        <SimpleGrid columns={{base:1,md:4}} spacing={{base:16,md:4}}>
        <Column column={ColumnType.TO_DO} />
        <Column column={ColumnType.IN_PROGRESS} />
        <Column column={ColumnType.BLOCKED} />
        <Column column={ColumnType.COMPLETED} />
        </SimpleGrid>
      </Container>
    </>
  )
}