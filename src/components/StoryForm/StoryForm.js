import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class StoryForm extends Component {

    constructor(props) {
        super(props)
        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component
        this.state = {
            text: null
        }
    }

    componentDidMount() {
        this.attachQuillRefs()
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    handleChange = () => {
        const editor = this.reactQuillRef.getEditor();
        const unprivilegedEditor = this.reactQuillRef.makeUnprivilegedEditor(editor);
        this.setState({
            text: unprivilegedEditor.getHTML()
        })
    }

    render() {
        return (
            <div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    preserveWhitespace={true}
                    onChange={() => this.handleChange()} />
                <div dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
            </div>
        )
    }
}

export default connect()(StoryForm);
