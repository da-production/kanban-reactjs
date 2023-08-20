import { AddIcon } from "@chakra-ui/icons";
import { Badge, Box, Heading, IconButton, Stack, useColorModeValue } from "@chakra-ui/react";
import { ColumnType } from "../utils/enums";
import Task from "./Task";
import useColumnTasks from "../hooks/useColumnTask";
import { useToast } from '@chakra-ui/react'

const ColumnColorScheme = {
    Todo: 'gray',
    'In Progress': 'blue',
    Blocked: 'red',
    Completed: 'green'
}

export default function Column({column})
{
    const {tasks, addEmptyTask, updateTask, deleteTask} = useColumnTasks(column)
    const toast = useToast()
    const ColumnTasks = tasks.map((task,index)=> <Task task={task} key={index} index={index} onDelete={deleteTask} onUpdate={updateTask} />)
    return (
        <Box >
            <Heading fontSize="md" mb={4} letterSpacing="wide" color="black">
                <Badge px={2} py={1} rounded="lg" colorScheme={ColumnColorScheme[column]}>
                    {column} {tasks.length}
                </Badge>
            </Heading>
            <IconButton 
                size="xs" 
                w="full" 
                color={useColorModeValue('gray.500','gray.400')} 
                bgColor={useColorModeValue('gray.200','gray.600')}
                py={2}
                mb={2}
                variant="sloid"
                colorScheme="black"
                aria-label="add-task"
                icon={<AddIcon />}
                onClick={()=>{
                    toast({
                        
                        title: 'Success',
                        description: `The Task was added in ${column} table successfully`,
                        status: 'success',
                        duration: 2500,
                        isClosable: true,
                    })
                    addEmptyTask()
                }}
            />
            <Stack
                overflowY="auto"
                css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'gray',
                    borderRadius: '24px',
                },
                }}
                direction={{base:'row',md:'column'}}
                h={{base:300,md:600}}
                p={4}
                mt={2}
                spacing={4}
                rounded="lg"
                boxShadow="md"
                overflow="auto"
            >
                {ColumnTasks}
            </Stack>
        </Box>
    )
}