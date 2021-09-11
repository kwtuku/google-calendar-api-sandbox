import ApiCalendar from 'react-google-calendar-api';

export default function DoubleButton() {
  function handleItemClick(name) {
    if (name === 'sign-in') {
      ApiCalendar.handleAuthClick();
    } else if (name === 'sign-out') {
      ApiCalendar.handleSignoutClick();
    }
  }

  const getEvents = async () => {
    return new Promise(async (resolve) => {
      if (ApiCalendar.sign) {
        ApiCalendar.listEvents({
          timeMin: new Date().toISOString(),
          showDeleted: true,
          maxResults: 10,
          orderBy: 'updated'
        }).then(({ result }) => {
          if (result.items) {
            console.log("Events From Calendar", result.items);
          } else {
            console.log("No Events")
          }

          resolve(result);
        });
      } else {
        ApiCalendar.handleAuthClick();

        resolve(null);
      }
    })
  };

  return (
    <>
      <button onClick={() => handleItemClick('sign-in')}>
        sign-in
      </button>
      <button onClick={() => handleItemClick('sign-out')}>
        sign-out
      </button>
      <button onClick={() => getEvents()}>Get Events</button>
    </>
  )
}
