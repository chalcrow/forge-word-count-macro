import ForgeUI, {
  Table,
  Head,
  Row,
  Cell,
  Text,
  SectionMessage,
  Fragment,
} from "@forge/ui";
import { FormState } from "./index";

type WordCountProps = Pick<FormState, "sortedWordFrequency" | "text">;

const WordCount = (props: WordCountProps): JSX.Element => {
  const { text, sortedWordFrequency } = props;

  return (
    <Fragment>
      <SectionMessage appearance="confirmation">
        <Text>You entered:</Text>
        <Text>{text}</Text>
      </SectionMessage>
      <Table>
        <Head>
          <Cell>
            <Text>Word</Text>
          </Cell>
          <Cell>
            <Text>Count</Text>
          </Cell>
        </Head>

        {sortedWordFrequency.map((wordFrequency) => (
          <Row>
            <Cell>
              <Text>{wordFrequency.word}</Text>
            </Cell>
            <Cell>
              <Text>{wordFrequency.count}</Text>
            </Cell>
          </Row>
        ))}
      </Table>
    </Fragment>
  );
};

export default WordCount;
