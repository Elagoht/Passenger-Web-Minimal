import re


def minify_html(html_content):
    html_content = re.sub(r'<!--.*?-->', '', html_content, flags=re.DOTALL)
    html_content = re.sub(r'\s+', ' ', html_content)
    html_content = html_content.replace('\n', '').replace('\r', '')
    return html_content.strip()


def minify_css(css_content):
    css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
    css_content = re.sub(r'\s+', ' ', css_content)
    css_content = re.sub(r'\s*([{};:,])\s*', r'\1', css_content)
    css_content = css_content.replace('\n', '').replace('\r', '')
    return css_content.strip()
