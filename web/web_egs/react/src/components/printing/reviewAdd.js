import React from 'react'
import {connect} from 'react-redux'
import {
    getAllCalendar,
    insertCalendar, resetCalendarList,
    setPostCalendar,
    toggleBtnAddCalendar,
    toggleFormAddCalendar
} from '../../actions/calendar/calendarList'
import {Tooltip} from 'react-tippy'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import is from 'is_js'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'
import {setHeader} from '../../actions/main'
import {URL} from '../../config'
import {insertReview} from "../../actions/printing/review";

@connect((store) => {
    return {
        reviews: store.review.reviews,
        lang: store.language.data
    }
})
export default class ReviewAdd extends React.Component {
    constructor() {
        super()
        this.checkmark = '\u2713'
        this.nothing = '\u0020\u0020\u0020'
        this.post = {}
        this.student = [
            {
                head: 'เพศ',
                name: 'gender',
                list: ['ชาย', 'หญิง']
            },
            {
                head: 'อายุ',
                name: 'age',
                list: ['๒๐-๓๐ ปี', '๓๑-๔๐ ปี', '๔๑-๕๐ ปี', 'มากกว่า ๕๐ ปี']
            },
            {
                head: 'ระดับการศึกษา',
                name: 'degree',
                list: ['ปริญญาโท', 'ปริญญาเอก']
            },
            {
                head: 'สาขาวิชา',
                name: 'branch',
                list: ['วิทยาการคอมพิวเตอร์', 'เทคโนโลยีสารสนเทศ', 'การรับรู้ระยะไกลและระบบสารสนเทศภูมิศาสตร์']
            },
            {
                head: 'กำลังศึกษาชั้นปีที่',
                name: 'year',
                list: ['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4']
            },
            {
                head: 'ภาคการศึกษา',
                name: 'semester',
                list: ['ต้น', 'ปลาย']
            },
            {
                head: 'ปีการศึกษา',
                name: 'enroll',
                list: [true],
                year: true
            }
        ]
        this.list = [
            {
                head: 'หลักสูตร',
                list: [
                    'การจัดการศึกษาสอดคล้องกับปรัชญาและวัตถุประสงค์ของหลักสูตร',
                    'มีการจัดแผนการศึกษาตลอดหลักสูตรอย่างชัดเจน',
                    'มีปฏิทินการศึกษาและโปรแกรมการศึกษาแต่ละภาคการศึกษาอย่างชัดเจน',
                    'หลักสูตรมีความทันสมัยสอดคล้องกับความต้องการของตลาดแรงงาน',
                    'วิชาเรียนมีความเหมาะสมและสอดคล้องกับความต้องการของนักศึกษา'
                ]
            },
            {
                head: 'อาจารย์ผู้สอน',
                list: [
                    'อาจารย์มีคุณวุฒิและประสบการณ์เหมาะสมกับรายวิชาที่สอน',
                    'อาจารย์สอน เนื้อหา ตรงตามวัตถุประสงค์ โดยใช้วิธีการที่หลากหลาย',
                    'อาจารย์สนับสนุนส่งเสริมให้นักศึกษาเรียนรู้ และพัฒนาตนเองอย่างสม่ำเสมอ',
                    'อาจารย์ให้คำปรึกษาด้านวิชาการและการพัฒนานักศึกษาได้อย่างเหมาะสม',
                    'อาจารย์เป็นผู้มีคุณธรรม และจิตสำนึกในความเป็นครู'
                ]
            },
            {
                head: 'สภาพแวดล้อมการเรียนรู้',
                list: [
                    'ห้องเรียนมีอุปกรณ์เหมาะสม เอื้อต่อการเรียนรู้ และเพียงพอต่อนักศึกษา',
                    'ห้องปฏิบัติการมีอุปกรณ์เหมาะสม เอื้อต่อการเรียนรู้ และเพียงพอต่อนักศึกษา',
                    'ระบบบริการสารสนเทศเหมาะสม เอื้อต่อการเรียนรู้และเพียงพอต่อนักศึกษา'
                ]
            },
            {
                head: 'การจัดการเรียนการสอน',
                list: [
                    'การจัดการเรียนการสอนสอดคล้องกับลักษณะวิชาและวัตถุประสงค์การเรียนรู้',
                    'การใช้สื่อประกอบการสอนอย่างเหมาะสม',
                    'วิธีการสอนส่งเสริมให้นักศึกษาได้ประยุกต์แนวคิดศาสตร์ทางวิชาชีพและ/หรือศาสตร์ที่เกี่ยวข้องในการพัฒนาการเรียนรู้',
                    'มีการใช้เทคโนโลยีสารสนเทศประกอบการเรียนการสอน',
                    'การจัดการเรียนการสอนที่ส่งเสริมทักษะทางภาษาสากล'
                ]
            },
            {
                head: 'การวัดและประเมินผล',
                list: [
                    'วิธีการวัดประเมินผลสอดคล้องกับวัตถุประสงค์ และกิจกรรมการเรียนการสอน',
                    'การวัดและประเมินผลเป็นไปตามระเบียบกฎเกณฑ์ และข้อตกลง ที่กำหนดไว้ล่วงหน้า'
                ]
            },
            {
                head: 'การเรียนรู้ตลอดหลักสูตรได้พัฒนาคุณลักษณะของนักศึกษา',
                list: [
                    'ด้านคุณธรรม จริยธรรม',
                    'ด้านความรู้',
                    'ด้านทักษะทางปัญญา',
                    'ด้านความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ',
                    'ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสาร และการใช้เทคโนโลยีสารสนเทศ'
                ]
            }
        ]
        this.rate = ['น้อยที่สุด', 'น้อย', 'ปานกลาง', 'มาก', 'มากที่สุด']
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        // NOTE: check if formAdd still displayed
    }

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
    }

    change(ev) {
        Object.keys(this.post).some((k) => {
            if (~k.indexOf(ev.target.name)) {
                if (k === `${ev.target.name}${ev.target.value}`)
                    this.post[k] = this.checkmark
                else
                    this.post[k] = this.nothing
            }
        })
    }

    changeText(ev, index) {
        this.post[`${ev.target.name}${index}`] = ev.target.value
    }

    submit() {
        const {dispatch} = this.props
        let good = true
        Object.keys(this.post).map(key => {
            if (this.post[key] === null) {
                good = false
            }
        })
        if (good) {
            dispatch(insertReview(this.post, response => {
                console.log(response)
            }))
        } else {
            console.log(this.post)
            alert('not good bruh')
        }
    }

    default(name, index) {
        this.post[`${name}${index}`] = null
        return null
    }

    render() {
        const {calendars, lang} = this.props
        return (
            <div>
                <div class='col col-sm-12' style={{textAlign: 'center'}}>
                    <h3>ข้อมูลเบื้องต้นของนักศึกษา</h3>
                </div>
                {
                    this.student.map((student, index1) =>
                        [
                            <div class='col col-sm-3' key={index1}>
                                <div>{student.head}</div>
                                {
                                    student.list.map((list, index2) =>
                                        <div key={index2}>
                                            {
                                                student.year ?
                                                    <input class='form-control' name={student.name} style={{
                                                        textAlign: 'center',
                                                        height: 30,
                                                        width: 120
                                                    }} onChange={(ev) => this.changeText(ev, index2)}
                                                           defaultValue={this.default(student.name, index2)}
                                                           maxLength={4} type='text'
                                                           placeholder='YYYY'/> :
                                                    <label class='radio'>
                                                        <input type='radio'
                                                               defaultChecked={this.default(student.name, index2)}
                                                               onChange={(ev) => this.change(ev)}
                                                               name={student.name} value={index2}/>
                                                        <i/>{list}
                                                    </label>
                                            }
                                        </div>
                                    )
                                }
                            </div>,
                            (index1 + 1) % 4 !== 0 || index1 === this.student.length - 1 ? null :
                                <div key={`cf${index1}`} class='clearfix' style={{marginBottom: 10}}/>
                        ]
                    )
                }
                <div class='col col-sm-12' style={{textAlign: 'center'}}>
                    <div>
                        <h3>ความพึงพอใจต่อคุณภาพหลักสูตร</h3>
                    </div>
                </div>
                <div class='col col-sm-12'>
                    {
                        this.list.map((list, index1) =>
                            <div key={index1} class='col col-sm-12' style={{textAlign: 'center'}}>
                                <h4>{`${index1 + 1}. ${list.head}`}</h4>
                                {list.list.map((list_, index2) =>
                                    <div key={index2}>
                                        <div>
                                            <h5
                                                class='col col-sm-12 nomargin'>{`(${index2 + 1}) ${list_}`}</h5>
                                        </div>
                                        <div style={{
                                            margin: '0 auto',
                                            width: '80%'
                                        }}>
                                            {
                                                this.rate.map((rate, index3) =>
                                                    <div key={index3} style={{
                                                        width: '20%',
                                                        float: 'left'
                                                    }}>
                                                        <label class='radio'>
                                                            <input type='radio'
                                                                   defaultChecked={this.default(`rate${index1}${index2}`, index3)}
                                                                   onChange={(ev) => this.change(ev)}
                                                                   name={`rate${index1}${index2}`}
                                                                   value={index3}/>
                                                            <i/>
                                                            <div>{rate}</div>
                                                        </label>
                                                    </div>
                                                )
                                            }
                                            <div class='clearfix'/>
                                            <hr/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
                <div class='clearfix' style={{marginBottom: 20}}/>
                <button onClick={() => this.submit()} class='btn btn-block btn-success'>OK</button>
            </div>
        )
    }
}