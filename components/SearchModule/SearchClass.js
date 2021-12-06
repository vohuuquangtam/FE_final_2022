import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form, FormInput } from "semantic-ui-react";
import Client from "../../services/Client";

function SearchClass() {
  const router = useRouter()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});

  const searchApi = async () => {
    const { data } = await Client(
      `classes?page=1&limit=20&order=DESC&key=${encodeURIComponent(query)}`,
      "GET"
    );
    setResults(data);
    router.push(`/classes/search?key=${encodeURIComponent(query)}`)
    setQuery('')
  };

  useEffect(() => {
    if (!query) return;
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <Form size="small" onSubmit={searchApi}>
        <Form.Group style={{ margin: "0px" }}>
          <div style={{ width: "250px", position: "relative" }}>
            <FormInput
              placeholder="Search classes"
              value={query}
              onChange={handleChange}
            />
          </div>
          <div style={{ margin: "0px", position: "absolute", right: "0" }}>
            <Form.Button
              style={{ margin: "0px", background: "none" }}
              icon="search"
            />
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SearchClass;
