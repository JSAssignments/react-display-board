import React from 'react';
import moment from 'moment';

class ScheduleComponent extends React.Component {

  	render() {
  		// since no carrier information was provided
        // hardcoded it
        const carrier = 'MBTA';

  		return (
          <tbody>
             {
                this.props.data.map((record, i) => {
                  record.Track = record.Track || 'TBD';

                  return (
                  <tr key={i}>
                     <td> { carrier } </td>
                     <td> { moment.unix(record.TimeStamp).format('LT') } </td>
                     <td> { record.Origin } </td>
                     <td> { record.Destination } </td>
                     <td> { record.Trip } </td>
                     <td> { record.Track } </td>
                     <td> { record.Status } </td>
                  </tr>
                  );
                })
             }
          </tbody>
  		);
  	}
}

export default ScheduleComponent;