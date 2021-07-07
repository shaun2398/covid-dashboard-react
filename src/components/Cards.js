import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      width: 275,
      margin: '1.5em 0'
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function Cards({title, caseNumbers}) {
    const classes = useStyles();
    return (
        <div>
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h5" component="h2">
                    {caseNumbers}
                </Typography>
            </CardContent>
        </Card>
        </div>
    )
}

export default Cards
