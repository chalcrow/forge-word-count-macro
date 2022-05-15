import ForgeUI, {
  Fragment,
  Macro,
  Form,
  TextArea,
  RadioGroup,
  Radio,
  Text,
  render,
  useState,
  SectionMessage,
} from "@forge/ui";
import WordCount from "./WordCount";
import { WordFrequency, calculateWordFrequency, sortWordFrequency } from "./word-frequency";

export interface FormState extends Sort {
  /**
   * the text entered by the user
   */
  text: string;
  /**
   * array of unique words and the frequency of their occurrence within the text entered
   */
  sortedWordFrequency: Array<WordFrequency>;
  /**
   * represents whether or not the form has been submitted by the user
   */
  isSubmitted: boolean;
}

export interface Sort {
  /**
   * sort order can be ascending (asc) or descending (desc)
   */
  sortOrder: "asc" | "desc";
  /**
   * the key on which the sort should be based
   */
  sortBy: "word" | "count";
}

type FormData = Omit<FormState, "isSubmitted">;

const initialFormState: FormState = {
  isSubmitted: false,
  text: "",
  sortedWordFrequency: [],
  sortBy: "word",
  sortOrder: "asc",
};

const App = (): JSX.Element => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const { text, sortBy, sortOrder } = formState;

  const maxTextLength: number = 50000;

  const onSubmit = (formData: FormData) => {

    if (formData.text.length > maxTextLength) {
      setFormState({
        ...formData,
        isSubmitted: true,
        sortedWordFrequency: null
      });
    }
    else {
      const { sortBy, sortOrder } = formData;
      const wordFrequency = calculateWordFrequency(formData.text);
      const sortedWordFrequency = sortWordFrequency(wordFrequency, { sortBy, sortOrder });

      setFormState({
        ...formData,
        isSubmitted: true,
        sortedWordFrequency
      });
    }
  };

  return (
    <Fragment>
      <Form
        onSubmit={onSubmit}
        submitButtonAppearance="primary"
        submitButtonText="Let's start counting!"
      >
        <TextArea
          isRequired
          name="text"
          defaultValue={text}
          label="Your input field"
        />
        <RadioGroup name="sortBy" label="Sort results by">
          <Radio label="Word" value="word" defaultChecked={sortBy === "word"} />
          <Radio
            label="Count"
            value="count"
            defaultChecked={sortBy === "count"}
          />
        </RadioGroup>
        <RadioGroup name="sortOrder" label="Sort order by">
          <Radio
            label="Ascending"
            value="asc"
            defaultChecked={sortOrder === "asc"}
          />
          <Radio
            label="Descending"
            value="desc"
            defaultChecked={sortOrder === "desc"}
          />
        </RadioGroup>
      </Form>
      {formState?.isSubmitted && formState.text.length > maxTextLength && (
        <SectionMessage appearance="error">
          <Text>Text entered exceeds maximum length of {maxTextLength} characters, by {text.length - maxTextLength} characters.</Text>
        </SectionMessage>
      )}
      {formState?.isSubmitted && formState.text.length <= maxTextLength && (
        <WordCount
          text={formState.text}
          sortedWordFrequency={formState.sortedWordFrequency}
        />
      )}
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
