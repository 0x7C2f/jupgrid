async function jitoTipCheck() {
    try {
      const response = await fetch(
        "https://jito-labs.metabaseapp.com/api/public/dashboard/016d4d60-e168-4a8f-93c7-4cd5ec6c7c8d/dashcard/154/card/188?parameters=%5B%5D"
      );
      if (!response.ok) {
        console.log(
          "Fetch request failed, using default tip value of 0.00005 SOL"
        );
        return 0.00005;
      }
      let json;
      try {
        json = await response.json();
      } catch (err) {
        console.log(
          "Invalid JSON response, using default tip value of 0.00005 SOL"
        );
        return 0.00005;
      }
      const row = json.data.rows[0];
      const tipVal = Number(row[6].toFixed(8));
      if (isNaN(tipVal)) {
        console.error("Invalid tip value:", tipVal);
        throw new Error("Invalid tip value");
      }
      lastTip = tipVal;
      return tipVal;
    } catch (err) {
      console.error(err);
      return lastTip !== null ? lastTip : 0.00005; // Return a default of 50000 lamports if the request fails
    }
}

export { jitoTipCheck }