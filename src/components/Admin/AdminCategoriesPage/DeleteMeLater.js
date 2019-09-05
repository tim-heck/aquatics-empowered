import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        backgroundColor: "#1f2833",
        color: "#fff",
        padding: "10px 25px",
        letterSpacing: "1.5px",
        transition: ".3s",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
        '&:hover': {
            backgroundColor: "#fff",
            color: "#1f2833",
            boxShadow: "0px 0px 0px 3px #66fcf1",
        }
    },
    card: {
        maxWidth: 345,
        display: "inline-block",
        width: "300px",
        boxShadow: "none",
        borderRadius: 0,
        margin: "0 5px 20px",
        verticalAlign: "top",
        '&:first-child': {
            backgroundColor: "#000"
        }
    },
    media: {
        height: 300,
    },
    actions: {
        display: "block",
        textAlign: "center",
        padding: 0,
    },
    typography: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
    }
});
class ManageMerch extends Component {
    /**
     * Method runs when the component is ready
     * Gets all products from the database
     * Sets edit mode to false if it was true onload
     */
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' });
        this.props.dispatch({ type: 'EDIT_MODE', payload: { edit: false } });
    }
    /**
     * Handles all click events
     * dispatchType: dictates what action to take
     * merchToModify: Merch item to use for action
     */
    handleClick = (dispatchType, merchToModify) => {
        if (dispatchType === 'add') {
            // Redirects to merch form
            this.props.history.push('/merch-form');
        }
        else if (dispatchType === 'edit') {
            // sends product to editMerchReducer
            this.props.dispatch({ type: 'EDIT_PRODUCT', payload: merchToModify });
            // Flips editMode on
            this.props.dispatch({ type: 'EDIT_MODE', payload: { edit: true } });
            // Redirects to merch form
            this.props.history.push('/merch-form');
        } else if (dispatchType === 'delete') {
            // deletes merch item
            this.props.dispatch({ type: 'DELETE_PRODUCT', payload: merchToModify });
        } else {
            // hides merch item from rendering on merch page
            this.props.dispatch({ type: 'HIDE_PRODUCT', payload: { id: merchToModify.id, hide: !merchToModify.hide} })
        }
    }
    /**
     * Checks if the products hide property is set to true or false
     * product: merch item to check
     */
    checkHidden = (product) => {
        const { classes } = this.props;
        if (product.hide) {
            return (
                <Button variant="contained" className={classes.button} onClick={() => this.handleClick('hide', product)}>Unhide</Button>
            );
        } else {
            return (
                <Button variant="contained" className={classes.button} onClick={() => this.handleClick('hide', product)}>Hide</Button>
            );
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="container merch-list">
                    <h2 className="page-title">Manage Merch</h2>
                    {this.props.reduxStore.merch.merchReducer.map(item =>
                        <Card className={classes.card} key={item.id}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={item.image_url}
                                    title={item.title}
                                />
                                <CardContent>
                                    <Typography className={classes.typography}>
                                        {item.title}
                                    </Typography>
                                    <br />
                                    <Typography className={classes.typography}>
                                        {item.description}
                                    </Typography>
                                    <br />
                                    <Typography className={classes.typography}>
                                        ${(item.price_pennies / 100).toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.actions}>
                                <Button variant="contained" className={classes.button} onClick={() => this.handleClick('edit', item)}>Edit</Button>
                                {this.checkHidden(item)}
                                {/* <Button variant="contained" className={classes.button} onClick={() => this.handleClick('delete', item)}>Delete</Button> */}
                            </CardActions>
                        </Card>
                    )}
                    <br/>
                    <Button variant="contained" className={classes.button} onClick={() => this.handleClick('add')}>Add New Merch Item</Button>
                </div>
            </>
        );
    }
}
// Redux state
const stateToProps = (reduxStore) => ({
    reduxStore
});
export default withStyles(styles)(connect(stateToProps)(ManageMerch));


