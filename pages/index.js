import { Box, Flex, Text, List, ListItem, UnorderedList} from "@chakra-ui/react"

export default function Home() {
  return(
    <Flex 
      direction={["column","column","row","row"]}
      align="center"
      justify="space-around"
      >
      <Box>
        Here we would render featured jobs
      </Box>
      <Box textAlign="center" ml={[20,20,0,0]} mr={[20,20,0,0]}>
      <Text>
          Finding a entry / junior level job that doesn't want 5 years of experience is hard.
        </Text>
        <Text>
          Here at COMPANYNAME we:
        </Text>
        <UnorderedList>
          <ListItem>List ONLY jobs requiring less than 2 years of experience</ListItem>
          <ListItem>Don't accept recruiters</ListItem>
          <ListItem>Keep it simple - no one wants not recreate their CV as a profile, just browse and click apply.</ListItem>
          <ListItem>Create a profile if you want to save and keep track of applications</ListItem>
        </UnorderedList>
      </Box>
    </Flex>
  )
}
