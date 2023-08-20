import {
    Box,
    Button,
    Grid,
    GridItem,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Skeleton,
    Stack,
    Tag,
    Textarea,
    useDisclosure
} from '@chakra-ui/react'
import {DeleteIcon, EditIcon} from '@chakra-ui/icons';
import {useToast} from '@chakra-ui/react'
import {useState} from 'react';
import Typewriter from './Typing';
import { useDebounce } from 'usehooks-ts';
function Task({index, task, onUpdate, onDelete}) {
    const OverlayTwo = () => (<ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'/>)

    const {isOpen, onOpen, onClose} = useDisclosure()
    
    const [overlay,
        setOverlay] = useState(<OverlayTwo/>)

    const toast = useToast()
    const handleUpdate = (e) => {
        const newTitle = e.target.value;
        onUpdate(task.id, {
            ...task,
            title: newTitle
        });
    }

    const handleDelete = () => {
        toast({title: 'Alert', description: `The Task was deleted from ${task.title} table successfully`, status: 'error', duration: 2500, isClosable: true})
        onDelete(task.id);
    }
    return (
        <Box
            key={index}
            as="div"
            role="group"
            position="relative"
            rounded="lg"
            w={200}
            pl={3}
            pr={7}
            pt={3}
            pb={1}
            boxShadow="xl"
            cursor="grab"
            bgColor='white'>
            <IconButton
                position="absolute"
                top={0}
                right={0}
                zIndex={100}
                aria-label="delete-task"
                size="md"
                colorScheme='solid'
                color="gray.700"
                icon={< DeleteIcon />}
                opacity={0}
                _groupHover={{
                opacity: 1
            }}
                onClick={() => {
                confirm("Are you sure ? ")
                    ? handleDelete()
                    : null
            }}/>
            <IconButton
                position="absolute"
                bottom={0}
                right={0}
                zIndex={100}
                aria-label="delete-task"
                size="md"
                colorScheme='solid'
                color="gray.700"
                icon={< EditIcon />}
                opacity={0}
                _groupHover={{
                opacity: 1
            }}
                onClick={() => {
                setOverlay(<OverlayTwo/>)
                onOpen()
            }}/>
            <Modal isCentered isOpen={isOpen} size='xl' onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader
                        position="realtive"
                    >
                        <EditIcon 
                            position="absolute"
                            top="30px"
                            left={9}
                            zIndex={100}
                            boxSize={4}
                        />
                        <Input
                            defaultValue={task.title}
                            focusBorderColor='transparent'
                            pl={10}
                            mr={40}
                            colorScheme="transparent"
                            onChange={handleUpdate}
                            />
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody></ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* <Textarea
                value={task.title}
                fontWeight="semibold"
                cursor="inhert"
                border="none"
                p={0}
                resize="none"
                minH={70}
                maxH={200}
                focusBorderColor='transparent'
                color="gray.700"
                onChange={handleUpdate}/> */}
                <Typewriter text={task.title} key={task.id}  />
            <SimpleGrid
                columns={{
                base: 1,
                md: 8
            }}
                spacing={{
                base: 16,
                md: 4
            }}>
                <GridItem>
                    <Skeleton
                        colSpan={2}
                        startColor={task.color}
                        endColor={task.color}
                        height='5px'
                        width='20px'/>
                </GridItem>
                <GridItem>
                    <Skeleton
                        colSpan={6}
                        startColor={task.color}
                        endColor={task.color}
                        height='5px'
                        width='60px'/>
                </GridItem>
            </SimpleGrid>

        </Box>
    )
}

export default Task;